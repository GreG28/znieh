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

            $building = $this->getReference('Building-' . $stepData['building']);

            $step
                ->setTitle($stepData['title'])
                ->setPoints($stepData['points'])
                ->setCosts($stepData['costs'])
                ->setBuilding($building)
            ;

            if (!empty($stepData['parent'])) {
                $parent = $this->getReference('Step-' . $stepData['parent']);
                $step->setParent($parent);
            }

            $manager->persist($step);
            $this->addReference('Step-' . $step->getTitle(), $step);
        }
        $manager->flush();
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
