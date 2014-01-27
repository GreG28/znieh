<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\Insigna;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadInsignaData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $insignasData = $this->getModelFixtures();

        // Create insignas
        foreach($insignasData as $insignaData) {
            $insigna = new Insigna();

            $step = $manager->getRepository('ZniehVillageGameBundle:Step')->findOneByTitle($insignaData['step']);

            $insigna
                ->setName($insignaData['name'])
                ->setStep($step)
            ;

            $points = empty($insignaData['points']) ? $step->getPoints() : $insignaData['points'];
            $insigna->setPoints($points);

            $manager->persist($insigna);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'insignas';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 28;
    }
}
