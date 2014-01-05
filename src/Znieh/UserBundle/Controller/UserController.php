<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Znieh\UserBundle\Form\Type\UserAdminType;
use Znieh\UserBundle\Entity\Ressource;
use Znieh\UserBundle\Entity\User;

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
     * @Route("/users/{slug}/ressource")
     * @Template()
     */
    public function showRessourceAction($slug)
    {
        /*$em = $this->getDoctrine()->getManager();
        $ressource = $em->getRepository('ZniehUserBundle:User')
                        ->findOneByUsernameCanonical($slug);
                        
        $em->flush();*/

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('ZniehUserBundle:User')
                   ->findOneByUsernameCanonical($slug);

        return array(
            'user' => $user,
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
