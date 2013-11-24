<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\Step;

class LoadStepData  extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * Steps to save
     */
    private $stepsData = array(
              array(
                'title'      => 'Lames en bronze',
                'building' => 'Forge',
                'parent' => '',
              ),
              array(
               'title'       => 'Lames en fer',
               'building' => 'Forge',
               'parent' => 'Lames en bronze',
              ),
              array(
               'title'       => 'Lames en fer souple',
               'building' => 'Forge',
               'parent' => 'Lames en fer',
              ),
              array(
               'title'       => 'Lames en fer dur',
               'building' => 'Forge',
               'parent' => 'Lames en fer',
              ),
            );

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // Create steps
        foreach($this->stepsData as $stepData) {
            $step = new Step();

            $building = $manager->getRepository('ZniehVillageGameBundle:Building')->findOneByTitle($stepData['building']);

            $step
                ->setTitle($stepData['title'])
                ->setBuilding($building)
            ;

            if (!empty($stepData['parent'])) {
                $parent = $manager->getRepository('ZniehVillageGameBundle:Step')->findOneByTitle($stepData['parent']);
                $step->setParent($parent);
            }

            $manager->persist($step);
            $manager->flush();
        }


    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 21;
    }
}
