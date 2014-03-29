<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ArmorType extends AbstractType
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
        $builder
            /*->add('type', 'entity', array(
                'class' => 'ZniehVillageGameBundle:ArmorType',
                'property' => 'name',
                'required' => true
            ))*/
            ->add('helm', new ArmorPieceType($this->userId, 'Casque'), array('label' => 'Tête'))
            ->add('torso', new ArmorPieceType($this->userId, 'Torse'), array('label' => 'Torse'))
            ->add('gloves', new ArmorPieceType($this->userId, 'Gants'), array('label' => 'Gants'))
            ->add('greaves', new ArmorPieceType($this->userId, 'Jambes'), array('label' => 'Jambes'))
            ->add('boots', new ArmorPieceType($this->userId, 'Bottes'), array('label' => 'Bottes'))
            /*
            ->add('pieces', 'bootstrap_collection', array(
                    'type' => new ArmorPieceType(),
                    'by_reference' => false,
                    'allow_add'          => true,
                    'allow_delete'       => true,
                    'add_button_text'    => 'Ajouter une question',
                    'delete_button_text' => 'Supprimer la question',
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
            'data_class' => 'Znieh\UnitGameBundle\Entity\Armor'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'znieh_unitgamebundle_armor';
    }
}
