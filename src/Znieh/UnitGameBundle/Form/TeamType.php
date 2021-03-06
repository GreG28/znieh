<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Znieh\UnitGameBundle\Entity\UnitRepository;

class TeamType extends AbstractType
{
    private $userId;

    public function __construct($userId) {
        $this->userId = $userId;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $userId = $this->userId;
        $builder
            ->add('name', null, array('label' => 'Nom'))
            ->add('units', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Unit',
                'by_reference' => false,
                'property' => 'name',
                'multiple' => true,
                'expanded' => true,
                'required' => true,
                'query_builder' => function(UnitRepository $er) use ($userId) {
                    return $er->findAllByUser($userId);
                },
            ))
            /*->add('unitsAdded', 'bootstrap_collection', array(
                'type' => new UnitType(),
                'mapped' => false,
                'by_reference' => false,
                'allow_add'          => true,
                'allow_delete'       => true,
                'add_button_text'    => 'Ajouter une unité',
                'delete_button_text' => 'Supprimer l\'unité',
                'sub_widget_col'     => 10,
                'button_col'         => 2
            ))*/
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Znieh\UnitGameBundle\Entity\Team'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'znieh_unitgamebundle_team';
    }
}
