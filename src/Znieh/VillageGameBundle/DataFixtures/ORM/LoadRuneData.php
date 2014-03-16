<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\Rune;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadRuneData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $runesData = $this->getModelFixtures();

        // Create runes
        foreach($runesData as $runeData) {
            $rune = new Rune();

            $type = $this->getReference('RuneType-' . $runeData['type']);
            $step = $this->getReference('Step-' . $runeData['step']);

            $rune
                ->setName($runeData['name'])
                ->setType($type)
                ->setStep($step)
            ;

            if (!empty($runeData['effects'])) {
                $rune->setEffects($runeData['effects']);
            }

            $points = empty($runeData['points']) ? $step->getPoints() : $runeData['points'];
            $rune->setPoints($points);

            $costs = empty($runeData['costs']) ? $step->getCosts() : $runeData['costs'];
            $rune->setCosts($costs);

            $manager->persist($rune);
            $this->addReference('Rune-' . $rune->getName(), $rune);
        }
        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'runes';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 29;
    }
}
