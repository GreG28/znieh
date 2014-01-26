<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\UnitGameBundle\Entity\Weight;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadWeightData  extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $weightsData = $this->getModelFixtures();

        // Create weights
        foreach($weightsData as $weightData) {
            $weight = new Weight();

            $weight
                ->setName($weightData['name'])
                ->setPoints($weightData['points'])
            ;

            $manager->persist($weight);
        }

        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'weights';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 31;
    }
}
