<?php

namespace Znieh\UnitGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Znieh\UnitGameBundle\Entity\Unit;

/**
 * @Route("/village/")
 * @Security("has_role('ROLE_USER')")
 */
class PublicController extends Controller
{
    /**
     * @Route("/teams")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }

    /**
     * @Route("api/units")
     */
    public function apiAction()
    {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $data = $em->getRepository('ZniehUnitGameBundle:Unit')->findAll();
        return new JsonResponse($serializer->serialize($data, 'json'));
    }
}
