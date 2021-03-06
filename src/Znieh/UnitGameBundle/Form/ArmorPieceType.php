<?php

namespace Znieh\UnitGameBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Znieh\VillageGameBundle\Entity\ArmorPartRepository;
use Znieh\VillageGameBundle\Entity\RuneRepository;
use Znieh\VillageGameBundle\Entity\InsignaRepository;

class ArmorPieceType extends AbstractType
{

    private $typeId;
    private $userId;

    public function __construct($userId, $typeId) {
        $this->userId = $userId;
        $this->typeId = $typeId;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $typeId = $this->typeId;
        $userId = $this->userId;
        $builder
            ->add('part', 'entity', array(
                'label' => 'Pièce',
                'class' => 'ZniehVillageGameBundle:ArmorPart',
                'property' => 'name',
                'required' => false,
                'query_builder' => function(ArmorPartRepository $er) use ($userId, $typeId) {
                    return $er->findUnlockedsByUserAndType($userId, $typeId);
                },
            ))
            ->add('rune', 'entity', array(
                'label' => 'Rune',
                'class' => 'ZniehVillageGameBundle:Rune',
                'property' => 'name',
                'required' => false,
                'query_builder' => function(RuneRepository $er) use ($userId) {
                    return $er->findUnlockedsByUser($userId);
                },
            ))
            ->add('insigna', 'entity', array(
                'label' => 'Insigne',
                'class' => 'ZniehVillageGameBundle:Insigna',
                'property' => 'name',
                'required' => false,
                'query_builder' => function(InsignaRepository $er) use ($userId) {
                    return $er->findUnlockedsByUser($userId);
                },
            ))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Znieh\UnitGameBundle\Entity\ArmorPiece'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'znieh_unitgamebundle_armorpiece';
    }
}
