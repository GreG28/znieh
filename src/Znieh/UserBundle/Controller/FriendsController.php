<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Znieh\UserBundle\Entity\Friends;
use Znieh\UserBundle\Entity\User;
use Znieh\UserBundle\Entity\FriendsLink;
use Znieh\UserBundle\Form\FriendsType;

/**
 * Friends controller.
 *
 * @Route("/friends")
 */
class FriendsController extends Controller
{
    /**
     * Lists all Friends entities.
     *
     * @Route("/", name="friends")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('ZniehUserBundle:Friends')->findAll();

        return array(
            'entities' => $entities,
            'mess' => "",
        );
    }

    /**
     * Creates a form to create a Friends entity.
     *
     * @param Friends $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Friends $entity)
    {
        $form = $this->createForm(new FriendsType(), $entity, array(
            'action' => $this->generateUrl('friends_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Chercher'));

        return $form;
    }

    /**
     * Displays a form to create a new Friends entity.
     *
     * @Route("/new", name="friends_new")
     * @Method("GET")
     * @Template("ZniehUserBundle:Friends:new.html.twig")
     */
    public function addAction()
    {
        $entities = new Friends();
        $form   = $this->createCreateForm($entities);
        $user = new User();

        return array(
            'entities' => $entities,
            'user' => $user,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a new Friends entity.
     *
     * @Route("/new", name="friends_create")
     * @Method("POST")
     * @Template("ZniehUserBundle:Friends:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entities = new Friends();
        $user = new User();
    
        $form = $this->createCreateForm($entities);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository('ZniehUserBundle:User')
                       ->findOneByUsernameCanonical($entities->getName());
        }

        return array(
            'entities' => $entities,
            'user' => $user,
            'form'   => $form->createView(),
        );
    }

    /**
     * @Route("/{id}", name="friends_link")
     * @Template("ZniehUserBundle:Friends:index.html.twig")
     */
    public function linkAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $slug = $this->container->get('security.context')->getToken()->getUser();
        $user = $em->getRepository('ZniehUserBundle:User')
                       ->findOneById($id);

        $link = new FriendsLink();
        $link->setUser1($slug);
        $link->setUser2($user);
        $link->setAccept(false);
        $link->setFriendIgnore(false);

        $em->persist($link);
        $em->flush();

        $entities = $em->getRepository('ZniehUserBundle:Friends')->findAll();

        return array(
            'entities' => $entities,
            'mess' => "La demande d'amis a bien été prise en compte",
        );
    }
}
