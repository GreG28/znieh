<?php
namespace Live\BlogBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Live\BlogBundle\Entity\Category;

class LoadCategoryData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * Categories to save
     */
    private $categoriesData = array(
              array(
                'name'  => 'Développement',
              ),
              array(
                'name'  => 'Divers',
              ),
            );

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

        foreach($this->categoriesData as $categoryData) {
            $category = new Category();
            $category
                ->setName($categoryData['name'])
            ;

            $manager->persist($category);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 10;
    }
}
