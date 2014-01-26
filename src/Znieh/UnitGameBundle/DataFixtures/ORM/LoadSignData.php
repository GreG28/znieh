<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\UnitGameBundle\Entity\Sign;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadSignData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $signsData = $this->getModelFixtures();

        // Create signs
        foreach($signsData as $signData) {
            $sign = new Sign();

            $sign
                ->setName($signData['name'])
            ;

            $manager->persist($sign);
        }

        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'signs';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 32;
    }
}
