<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\Step;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadStepData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $stepsData = $this->getModelFixtures();

        // Create steps
        foreach($stepsData as $stepData) {
            $step = new Step();

            $building = $manager->getRepository('ZniehVillageGameBundle:Building')->findOneByTitle($stepData['building']);

            $step
                ->setTitle($stepData['title'])
                ->setPoints($stepData['points'])
                ->setBuilding($building)
            ;

            if (!empty($stepData['parent'])) {
                $parent = $manager->getRepository('ZniehVillageGameBundle:Step')->findOneByTitle($stepData['parent']);
                $step->setParent($parent);
            }

            $manager->persist($step);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'steps';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 21;
    }
}
