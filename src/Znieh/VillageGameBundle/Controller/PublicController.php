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
            // TODO redirect
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

        // On ajoute le boolean unlocked aux objets récupés dans la requete unlocked
        foreach ($objects as $obj) {
            foreach ($unlockeds as $unlocked) {
                if ($obj->getName() == $unlocked->getObject()->getName()) {
                    $obj->setUnlocked(true);
                }
            }
            $obj->cost = "500 {{bois}}";
        }

        return array(
            'steps'     => $steps,
            'building'  => $building,
            'buildings' => $buildings,
            'objects'   => $objects
            );
    }

    /**
     * @Route("/unlock/{object}")
     * @Template()
     */
    public function unlockAction($object)
    {
        $request = $this->getRequest();

        if($request->isXmlHttpRequest())
        {
            $em = $this->getDoctrine()->getManager();
            $obj = $em->getRepository('ZniehVillageGameBundle:GameObject')->findOneById($object);

            $unlocked = new UnlockedGameObject();
            $unlocked->setUser($this->getUser());
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
