<?php

namespace Znieh\UnitGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/village/create/")
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
}
