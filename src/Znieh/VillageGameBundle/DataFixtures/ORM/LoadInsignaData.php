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

            $step = $this->getReference('Step-' . $insignaData['step']);

            $insigna
                ->setName($insignaData['name'])
                ->setStep($step)
            ;

            if (!empty($insignaData['effects'])) {
                $insigna->setEffects($insignaData['effects']);
            }

            $points = empty($insignaData['points']) ? $step->getPoints() : $insignaData['points'];
            $insigna->setPoints($points);

            $costs = empty($insignaData['costs']) ? $step->getCosts() : $insignaData['costs'];
            $insigna->setCosts($costs);

            $manager->persist($insigna);
            $this->addReference('Insigna-' . $insigna->getName(), $insigna);
        }
        $manager->flush();
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
