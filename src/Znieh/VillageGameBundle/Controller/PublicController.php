<?php

namespace Znieh\VillageGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;

use Znieh\VillageGameBundle\Entity\UnlockedGameObject;
use Znieh\VillageGameBundle\Entity\GameObject;

/**
 * @Route("/village")
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
     * @Route("/{building}")
     * @Template()
     */
    public function buildingAction($building)
    {
        $em = $this->getDoctrine()->getManager();

        $building = $em->getRepository('ZniehVillageGameBundle:Building')->findOneByTitle($building);

        if ($building != null) {
            $unlocked = $em->getRepository('ZniehVillageGameBundle:UnlockedGameObject')->findUnlockedObjectsByUserByBuilding(
                $this->getUser()->getId(),
                $building->getId()
            );
        }
        
        return array(
            'building' => $building,
            'unlocked' => $unlocked
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
                return new Response("pas ok, déja débloqué !" , 200 , array( 'Content-Type' => 'application/json' ));
            }
            return new Response("ok" , 200 , array( 'Content-Type' => 'application/json' ));
        }
        return new  Response();       
    }
}
