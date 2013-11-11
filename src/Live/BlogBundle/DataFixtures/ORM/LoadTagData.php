<?php
namespace Live\BlogBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Live\BlogBundle\Entity\Tag;

class LoadTagData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * Categories to save
     */
    private $tagsData = array(
              array(
                'name'  => 'Symfony',
              ),
              array(
                'name'  => 'Node.js',
              ),
            );

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

        foreach($this->tagsData as $tagData) {
            $tag = new Tag();
            $tag
                ->setName($tagData['name'])
            ;

            $manager->persist($tag);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 11;
    }
}
