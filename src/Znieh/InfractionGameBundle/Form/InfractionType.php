<?php

namespace Znieh\InfractionGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class InfractionType extends AbstractType
{
        /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            //->add('createdAt')
            ->add('user')
            ->add('type', new InfractionTypeType())
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Znieh\InfractionGameBundle\Entity\Infraction'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'znieh_infractiongamebundle_infraction';
    }
}
