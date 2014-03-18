<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\UnitGameBundle\Entity\Sprite;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadSpriteData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $spritesData = $this->getModelFixtures();

        // Create Sprites
        foreach($spritesData as $spriteData) {
            $sprite = new Sprite();

            $sprite
                ->setName($spriteData['name'])
            ;

            $manager->persist($sprite);
        }

        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'sprites';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 32;
    }
}
