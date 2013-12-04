<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\WeaponPartType;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadWeaponPartTypeData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $weaponPartTypesData = $this->getModelFixtures();

        // Create weaponPartTypes
        foreach($weaponPartTypesData['WeaponPartType'] as $weaponPartTypeData) {
            $weaponPartType = new weaponPartType();

            $type = $manager->getRepository('ZniehVillageGameBundle:WeaponPartType')->findOneByTitle($weaponPartTypeData['type']);

            $weaponPartType
                ->setName($weaponPartTypeData['name'])
                ->setType($type)
            ;

            $manager->persist($weaponPartType);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'weaponPartType';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 23;
    }
}
