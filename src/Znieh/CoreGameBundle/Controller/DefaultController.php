<?php

namespace Znieh\CoreGameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class DefaultController extends Controller
{
    /**
     * @Route("/game")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     */
    public function indexAction()
    {
        return array();
    }
}
