<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\ArmorPartType;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadArmorPartTypeData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $armorPartTypesData = $this->getModelFixtures();

        // Create weaponPartTypes
        foreach($armorPartTypesData as $armorPartTypeData) {
            $armorPartType = new ArmorPartType();

            $armorPartType
                ->setName($armorPartTypeData['name'])
                ->setEffects($armorPartTypeData['effects'])
            ;

            $manager->persist($armorPartType);
            $this->addReference('ArmorPartType-' . $armorPartType->getName(), $armorPartType);
        }
        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'armorPartType';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 26;
    }
}
