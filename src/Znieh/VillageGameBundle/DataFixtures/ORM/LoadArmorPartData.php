<?php
namespace Znieh\VillageGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use Znieh\VillageGameBundle\Entity\ArmorPart;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;

class LoadArmorPartData extends AbstractFixtureLoader implements OrderedFixtureInterface
{

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
      $armorPartsData = $this->getModelFixtures();

        foreach($armorPartsData as $armorPartData) {
            $armorPart = new ArmorPart();

            //echo $armorPartData['name'];
            $type = $manager->getRepository('ZniehVillageGameBundle:ArmorPartType')->findOneByName($armorPartData['type']);
            $step = $manager->getRepository('ZniehVillageGameBundle:Step')->findOneByTitle($armorPartData['step']);

            $armorPart
                ->setName($armorPartData['name'])
                ->setType($type)
                ->setStep($step)
            ;

            if (!empty($armorPartData['effects'])) {
                $armorPart->setEffects($armorPartData['effects']);
            }
            foreach ($type->getEffects() as $key => $effect) {
                $armorPart->addEffect($key, $effect);
            }

            $points = empty($armorPartData['points']) ? $step->getPoints() : $armorPartData['points'];
            $armorPart->setPoints($points);

            $costs = empty($armorPartData['costs']) ? $step->getCosts() : $armorPartData['costs'];
            $armorPart->setCosts($costs);

            $manager->persist($armorPart);
            $manager->flush();
        }
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'armorPart';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 28;
    }
}
