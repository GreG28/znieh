<?php
namespace Znieh\InfractionGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\InfractionGameBundle\Entity\InfractionType;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadInfractionTypeData  extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $infractionTypesData = $this->getModelFixtures();

        // Create infractionTypes
        foreach($infractionTypesData as $infractionTypeData) {
            $infractionType = new InfractionType();

            $infractionType
                ->setType($infractionTypeData['type'])
                ->setTitle($infractionTypeData['title'])
                ->setEmail($infractionTypeData['email'])
            ;

            $manager->persist($infractionType);
        }

        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'infractiontypes';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 20;
    }
}
