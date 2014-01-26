<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\RuneType;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadRuneTypeData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $runeTypesData = $this->getModelFixtures();

        // Create runeTypes
        foreach($runeTypesData as $runeTypeData) {
            $runeType = new RuneType($runeTypeData['name']);

            $manager->persist($runeType);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'runeTypes';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 28;
    }
}
