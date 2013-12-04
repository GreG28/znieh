<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\WeaponPart;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadWeaponPartData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $weaponPartsData = $this->getModelFixtures();

        // Create steps
        foreach($weaponPartsData as $weaponPartData) {
            $weaponPart = new weaponPart();

            $type = $manager->getRepository('ZniehVillageGameBundle:WeaponPartType')->findOneByName($weaponPartData['type']);

            $weaponPart
                ->setName($weaponPartData['name'])
                ->setType($type)
            ;

            $manager->persist($weaponPart);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'weaponPart';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 25;
    }
}
