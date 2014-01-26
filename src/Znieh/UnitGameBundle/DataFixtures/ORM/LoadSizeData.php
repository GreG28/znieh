<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\UnitGameBundle\Entity\Size;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadSizeData  extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $sizesData = $this->getModelFixtures();

        // Create sizes
        foreach($sizesData as $sizeData) {
            $size = new Size();

            $size
                ->setName($sizeData['name'])
                ->setPoints($sizeData['points'])
            ;

            $manager->persist($size);
        }

        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'sizes';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 30;
    }
}
