<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UnitType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            //->add('cost')
            ->add('name')
            ->add('sprite', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Sprite',
                'property' => 'name',
            ))
            ->add('sign', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Sign',
                'property' => 'name',
            ))
            ->add('size', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Size',
                'property' => 'name',
            ))
            ->add('weight', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Weight',
                'property' => 'name',
            ))
            //->add('createdAt')
            //->add('updatedAt')
            ->add('weapon', new WeaponType())
            ->add('armor', new ArmorType())
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
