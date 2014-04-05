<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Znieh\UnitGameBundle\Entity\TeamRepository;

class SelectTeamType extends AbstractType
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
            ->add('teams', 'entity', array(
                'class' => 'ZniehUnitGameBundle:Team',
                'by_reference' => false,
                'property' => 'name',
                'multiple' => false,
                'expanded' => true,
                'required' => true,
                'query_builder' => function(TeamRepository $er) use ($userId) {
                    return $er->findAllByUser($userId);
                },
            ))
        ;
    }

    // /**
    //  * @param OptionsResolverInterface $resolver
    //  */
    // public function setDefaultOptions(OptionsResolverInterface $resolver)
    // {
    //     $resolver->setDefaults(array(
    //         'data_class' => 'Znieh\UnitGameBundle\Entity\Team'
    //     ));
    // }

    /**
     * @return string
     */
    public function getName()
    {
        return 'znieh_unitgamebundle_team_select';
    }
}
