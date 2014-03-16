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

            $building = $this->getReference('Building-' . $armorTypeData['building']);

            $armorType
                ->setName($armorTypeData['name'])
                ->setBuilding($building)
            ;

            if (!empty($armorTypeData['parts'])) {
                foreach ($armorTypeData['parts'] as $partData) {
                    $part = $this->getReference('ArmorPartType-' . $partData);
                    $armorType->addPart($part);
                }
            }

            $manager->persist($armorType);
            $this->addReference('ArmorType-' . $armorType->getName(), $armorType);
        }
        $manager->flush();
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
