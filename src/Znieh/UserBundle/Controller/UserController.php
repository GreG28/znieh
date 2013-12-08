<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Znieh\UserBundle\Form\Type\UserAdminType;

class UserController extends Controller
{
    /**
     * @Route("/users")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('ZniehUserBundle:User')->findAll();

        return array(
            'users' => $users,
        );
    }


    /**
     * @Route("/users/{slug}")
     * @Template()
     */
    public function viewAction($slug)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('ZniehUserBundle:User')->findOneByUsernameCanonical($slug);

        if (!$user) {
            throw $this->createNotFoundException('Impossible de trouver cet utilisateur !');
        }

        return array(
            'user' => $user,
        );
    }

}
