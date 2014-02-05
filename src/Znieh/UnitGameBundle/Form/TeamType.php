<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TeamType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('units', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Unit',
                'by_reference' => false,
                'property' => 'name',
                'multiple' => true,
                'expanded' => true,
                'required' => true
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
