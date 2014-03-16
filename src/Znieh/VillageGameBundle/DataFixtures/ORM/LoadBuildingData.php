<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\Building;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadBuildingData  extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $buildingsData = $this->getModelFixtures();

        // Create buildings
        foreach($buildingsData as $buildingData) {
            $building = new Building();

            $building
                ->setTitle($buildingData['title'])
                ->setDescription($buildingData['description'])
            ;

            $manager->persist($building);
            $this->addReference('Building-' . $building->getTitle(), $building);
        }
        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'buildings';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 20;
    }
}
