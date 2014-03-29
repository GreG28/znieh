<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UnitType extends AbstractType
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
            //->add('cost')
            ->add('name', null, array('label' => 'Nom'))
            ->add('sprite', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Sprite',
                'property' => 'name',
                'label' => 'Design'
            ))
            ->add('sign', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Sign',
                'property' => 'name',
                'label' => 'Signe'
            ))
            ->add('size', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Size',
                'property' => 'name',
                'label' => 'Taille'
            ))
            ->add('weight', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Weight',
                'property' => 'name',
                'label' => 'Physique'
            ))
            //->add('createdAt')
            //->add('updatedAt')
            ->add('weapon', new WeaponType(), array('label' => 'Arme'))
            ->add('armor', new ArmorType($this->userId), array('label' => 'Armure'))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Znieh\UnitGameBundle\Entity\Unit'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'znieh_unitgamebundle_unit';
    }
}
