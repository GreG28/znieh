<?php
namespace Znieh\UnitGameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Znieh\PublicBundle\DataFixtures\ORM\AbstractFixtureLoader;
use Znieh\UserBundle\Entity\User;
use Znieh\UnitGameBundle\Entity\Unit;
use Znieh\UnitGameBundle\Entity\Team;
use Znieh\UnitGameBundle\Entity\Weapon;
use Znieh\UnitGameBundle\Entity\Armor;
use Znieh\UnitGameBundle\Entity\ArmorPiece;

class LoadUnitData extends AbstractFixtureLoader implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $teamsData = $this->getModelFixtures();
        $users = $manager->getRepository('ZniehUserBundle:User')->findAll();

        foreach ($users as $user) {
            foreach($teamsData as $teamData) {
                $team = new Team();

                $team
                    ->setName($teamData['name'])
                    ->setSelected($teamData['selected'])
                    ->setSave($teamData['save'])
                    ->setUser($user)
                ;

                foreach ($teamData['units'] as $unitData) {
                    $weaponData = $unitData['weapon'];
                    $weapon = new Weapon();
                    $weapon->setType($manager->getRepository('ZniehVillageGameBundle:WeaponType')->findOneByName($weaponData['type']));
                    foreach ($weaponData['parts'] as $part) {
                        $weapon->addPart($manager->getRepository('ZniehVillageGameBundle:WeaponPart')->findOneByName($part));
                    }
                    $weapon->setUser($user);

                    $armor = new Armor();
                    $armorData = $unitData['armor'];
                    $armor->setType($manager->getRepository('ZniehVillageGameBundle:ArmorType')->findOneByName($armorData['type']));

                    foreach ($armorData['pieces'] as $key => $pieceData) {
                        $piece = new ArmorPiece();
                        $piece->setPart($manager->getRepository('ZniehVillageGameBundle:ArmorPart')->findOneByName($pieceData['part']));
                        $piece->setRune($manager->getRepository('ZniehVillageGameBundle:Rune')->findOneByName($pieceData['rune']));
                        $piece->setInsigna($manager->getRepository('ZniehVillageGameBundle:Insigna')->findOneByName($pieceData['insigna']));
                        switch ($key) {
                            case 'helm':
                                $armor->setHelm($piece);
                                break;
                            case 'torso':
                                $armor->setTorso($piece);
                                break;
                            case 'gloves':
                                $armor->setGloves($piece);
                                break;
                            case 'greaves':
                                $armor->setGreaves($piece);
                                break;
                            case 'boots':
                                $armor->setBoots($piece);
                                break;
                            default:
                                break;
                        }
                    }

                    $unit = new Unit();
                    $unit
                      ->setName($unitData['name'])
                      ->setWeapon($weapon)
                      ->setArmor($armor)
                      ->setUser($user)
                      ->setSign($manager->getRepository('ZniehUnitGameBundle:Sign')->findOneByName($unitData['sign']))
                      ->setSize($manager->getRepository('ZniehUnitGameBundle:Size')->findOneByName($unitData['size']))
                      ->setWeight($manager->getRepository('ZniehUnitGameBundle:Weight')->findOneByName($unitData['weight']))
                    ;
                    $team->addUnit($unit);
                }
            }
            $manager->persist($team);
        }
        $manager->flush();
    }

    /**
     * The main fixtures file for this loader.
     */
    public function getModelFile()
    {
        return 'teams';
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 40;
    }
}
