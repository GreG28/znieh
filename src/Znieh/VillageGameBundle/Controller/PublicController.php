<?php

namespace Znieh\VillageGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Znieh\VillageGameBundle\Entity\UnlockedGameObject;
use Znieh\VillageGameBundle\Entity\GameObject;
use Znieh\UnitGameBundle\Entity\Weapon;
use Znieh\UnitGameBundle\Form\WeaponType;

/**
 * @Route("/village")
 * @Security("has_role('ROLE_USER')")
 */
class PublicController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        return $this->redirect($this->generateUrl('znieh_villagegame_public_building', array('building' => 'Forge')));
        $em = $this->getDoctrine()->getManager();

        $buildings = $em->getRepository('ZniehVillageGameBundle:Building')->findAll();

        return array(
            'buildings' => $buildings
            );
    }

    /**
     * @Template()
     */
    public function listBuildingAction()
    {
        $em = $this->getDoctrine()->getManager();

        $buildings = $em->getRepository('ZniehVillageGameBundle:Building')->findAll();

        return array(
            'buildings' => $buildings
            );
    }


    /**
     * @Route("/{building}")
     * @Template()
     */
    public function buildingAction($building)
    {
        $em = $this->getDoctrine()->getManager();

        $building = $em->getRepository('ZniehVillageGameBundle:Building')->findOneByTitle($building);
        $buildings = $em->getRepository('ZniehVillageGameBundle:Building')->findAll();

        if ($building == null) {
            $this->redirect($this->generateUrl('znieh_villagegame_public_index'));
        }

        $steps = $em->getRepository('ZniehVillageGameBundle:Step')->findAllByBuilding(
            $building->getId()
        );
        $objects = $em->getRepository('ZniehVillageGameBundle:GameObject')->findObjectsByBuilding(
            $building->getId()
        );
        $unlockeds = $em->getRepository('ZniehVillageGameBundle:UnlockedGameObject')->findUnlockedObjectsByUserByBuilding(
            $this->getUser()->getId(),
            $building->getId()
        );

        $form = $this->createForm(new WeaponType(), new Weapon(), array(
            'action' => $this->generateUrl('village_create_weapon_create'),
            'method' => 'POST',
        ));
        $form->add('submit', 'submit', array('label' => 'Create'));

        $weapons = $em->getRepository('ZniehUnitGameBundle:Weapon')->findByUserByBuilding(
            $this->getUser()->getId(),
            $building->getId()
        );

        // On ajoute le boolean unlocked aux objets récupés dans la requete unlocked
        foreach ($objects as $obj) {
            foreach ($unlockeds as $unlocked) {
                if ($obj->getName() == $unlocked->getObject()->getName()) {
                    $obj->setUnlocked(true);
                }
            }
        }

        $weaponBuilding = in_array($building->getTitle(), array('Forge', 'Archerie', 'Hacherie'));

        return array(
            'weaponBuilding' => $weaponBuilding,
            'steps'     => $steps,
            'building'  => $building,
            'buildings' => $buildings,
            'objects'   => $objects,
            'weapons' => $weapons,
            'form' => $form->createView()
            );
    }

    /**
     * @Route("/unlock/{object}", options={"expose"=true, "i18n"=true})
     * @Template()
     */
    public function unlockAction($object)
    {
        $request = $this->getRequest();

        if($request->isXmlHttpRequest())
        {
            $em = $this->getDoctrine()->getManager();
            $obj = $em->getRepository('ZniehVillageGameBundle:GameObject')->findOneById($object);

            $user = $this->getUser();
            $ressource = $user->getRessource();
            foreach ($obj->getCosts() as $key => $cost) {
                switch ($key) {
                    case 'po':
                        $ressource->addGold(-$cost);
                        break;
                    case 'sto':
                        $ressource->addSto(-$cost);
                        break;
                    case 'cuivre':
                        $ressource->addCopper(-$cost);
                        break;
                    case 'bronze':
                        $ressource->addBronze(-$cost);
                        break;
                    case 'ettofeMineur':
                        $ressource->addMinorCloth(-$cost);
                        break;
                    case 'variable':
                        $ressource->addMinorCloth(-$cost);
                        break;
                    case 'boisReche':
                        $ressource->addMinorCloth(-$cost);
                        break;
                    default:
                        break;
                }
            }

            $unlocked = new UnlockedGameObject();
            $unlocked->setUser($user);
            $unlocked->setObject($obj);

            $em->persist($unlocked);
            try {
                $em->flush();
            } catch (\Doctrine\DBAL\DBALException $e) {
                return new JsonResponse(null, 401);
            }
            return new JsonResponse("ok");
        }
        return new  Response();
    }
}
