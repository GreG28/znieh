<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\Building;

class LoadBuildingData  extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * Buildings to save
     */
    private $buildingsData = array(
              array(
                'title'       => 'Forge',
                'description' => 'Ceci est une forge',
              ),
              array(
                'title'       => 'Archerie',
                'description' => 'Ceci est une archerie',
              ),
            );

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // Create buildings
        foreach($this->buildingsData as $buildingData) {
            $building = new Building();

            $building
                ->setTitle($buildingData['title'])
                ->setDescription($buildingData['description'])
            ;

            $manager->persist($building);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 20;
    }
}
