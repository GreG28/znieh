<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\WeaponType;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadWeaponTypeData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $weaponTypesData = $this->getModelFixtures();

        // Create weaponTypes
        foreach($weaponTypesData as $weaponTypeData) {
            $weaponType = new WeaponType();

            $building = $this->getReference('Building-' . $weaponTypeData['building']);

            $weaponType
                ->setName($weaponTypeData['name'])
                ->setBuilding($building)
            ;

            if (!empty($weaponTypeData['parts'])) {
                foreach ($weaponTypeData['parts'] as $partData) {
                    $part = $this->getReference('WeaponPartType-' . $partData);
                    $weaponType->addPart($part);
                }
            }

            $manager->persist($weaponType);
            $this->addReference('WeaponType-' . $weaponType->getName(), $weaponType);
        }
        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'weaponType';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 23;
    }
}
