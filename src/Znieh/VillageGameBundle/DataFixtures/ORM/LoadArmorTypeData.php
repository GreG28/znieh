<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\ArmorType;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadArmorTypeData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $armorTypesData = $this->getModelFixtures();

        // Create armorTypes
        foreach($armorTypesData as $armorTypeData) {
            $armorType = new ArmorType();

            $building = $manager->getRepository('ZniehVillageGameBundle:Building')->findOneByTitle($armorTypeData['building']);

            $armorType
                ->setName($armorTypeData['name'])
                ->setBuilding($building)
            ;

            if (!empty($armorTypeData['parts'])) {
                foreach ($armorTypeData['parts'] as $partData) {
                    $part = $manager->getRepository('ZniehVillageGameBundle:ArmorPartType')->findOneByName($partData);
                    $armorType->addPart($part);
                }
            }

            $manager->persist($armorType);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'armorType';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 27;
    }
}
