<?php

namespace Znieh\VillageGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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
}
