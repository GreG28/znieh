<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\WeaponPart;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadWeaponPartData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $weaponPartsData = $this->getModelFixtures();

        // Create steps
        foreach($weaponPartsData as $weaponPartData) {
            $weaponPart = new weaponPart();

            //echo $weaponPartData['name'];
            $type = $this->getReference('WeaponPartType-' . $weaponPartData['type']);
            $step = $this->getReference('Step-' . $weaponPartData['step']);

            $weaponPart
                ->setName($weaponPartData['name'])
                ->setType($type)
                ->setStep($step)
            ;

            if (!empty($weaponPartData['effects'])) {
                $weaponPart->setEffects($weaponPartData['effects']);
            }

            $points = empty($weaponPartData['points']) ? $step->getPoints() : $weaponPartData['points'];
            $weaponPart->setPoints($points);

            $costs = empty($weaponPartData['costs']) ? $step->getCosts() : $weaponPartData['costs'];
            $weaponPart->setCosts($costs);

            $manager->persist($weaponPart);
            $this->addReference('WeaponPart-' . $weaponPart->getName(), $weaponPart);
        }
        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'weaponPart';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 25;
    }
}
