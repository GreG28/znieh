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
        $slug = $this->container->get('security.context')->getToken()->getUser();

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('ZniehUserBundle:FriendsLink')
                        ->findFriends($slug);

        return array(
            'entities' => $entities,
            'mess' => "",
            'userAct' => $slug,
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
        $slug = $this->container->get('security.context')->getToken()->getUser();

        $form = $this->createCreateForm($entities);
        $form->handleRequest($request);

        if ($form->isValid() and $entities->getName() != $slug->getUsernameCanonical()) {
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository('ZniehUserBundle:User')
                       ->findOneByUsernameCanonical($entities->getName());
        }
        else
            $user = null;

        return array(
            'entities' => $entities,
            'user' => $user,
            'form'   => $form->createView(),
        );
    }

    /**
     * @Route("/link/{id}", name="friends_link")
     * @Template()
     */
    public function linkAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $slug = $this->container->get('security.context')->getToken()->getUser();
        $user = $em->getRepository('ZniehUserBundle:User')
                       ->findOneById($id);

        $verif = $em->getRepository('ZniehUserBundle:FriendsLink')
                          ->findDouble($slug, $user);

        if($verif == null)
        {
            $link = new FriendsLink();
            $link->setUser1($slug);
            $link->setUser2($user);
            $link->setAccept(false);
            $link->setFriendIgnore(false);

            $em->persist($link);
            $em->flush();

            $mess = "La demande d'amis a bien été prise en compte";
        }
        else
            $mess = "Vous êtes déjà amis avec cette personne";

        $entities = $em->getRepository('ZniehUserBundle:FriendsLink')
                        ->findByUser1($slug->getId());

        return $this->redirect( $this->generateUrl('friends', array(
            'entities' => $entities,
            'mess' => $mess,
            'userAct' => $slug,
        )) );
    }

    /**
     * @Route("/accept/{id}", name="friends_accept")
     * @Template()
     */
    public function acceptAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $slug = $this->container->get('security.context')->getToken()->getUser();

        $user = $em->getRepository('ZniehUserBundle:User')
                    ->findOneById($id);

        $friendsLink = $em->getRepository('ZniehUserBundle:FriendsLink')
                          ->findDouble($slug, $user);

        if($friendsLink != null)
        {
            $friendsLink->setAccept(true);
            $em->flush();
        }

        $entities = $em->getRepository('ZniehUserBundle:FriendsLink')
                        ->findFriends($slug);

        return $this->redirect( $this->generateUrl('friends', array(
            'entities' => $entities,
            'mess' => "",
            'userAct' => $slug,
        )) );
    }

    /**
     * @Route("/ignore/{id}", name="friends_ignore")
     * @Template()
     */
    public function ignoreAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $slug = $this->container->get('security.context')->getToken()->getUser();

        $user = $em->getRepository('ZniehUserBundle:User')
                    ->findOneById($id);

        $friendsLink = $em->getRepository('ZniehUserBundle:FriendsLink')
                          ->findDouble($slug, $user);

        if($friendsLink != null)
        {
            $friendsLink->setFriendIgnore(true);
            $em->flush();
        }

        $entities = $em->getRepository('ZniehUserBundle:FriendsLink')
                        ->findFriends($slug);

        return $this->redirect( $this->generateUrl('friends', array(
            'entities' => $entities,
            'mess' => "",
            'userAct' => $slug,
        )) );
    }

    /**
     * @Route("/notIgnore/{id}", name="friends_notIgnore")
     * @Template()
     */
    public function notIgnoreAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $slug = $this->container->get('security.context')->getToken()->getUser();

        $user = $em->getRepository('ZniehUserBundle:User')
                    ->findOneById($id);

        $friendsLink = $em->getRepository('ZniehUserBundle:FriendsLink')
                          ->findDouble($slug, $user);

        if($friendsLink != null)
        {
            $friendsLink->setFriendIgnore(false);
            $em->flush();
        }

        $entities = $em->getRepository('ZniehUserBundle:FriendsLink')
                        ->findFriends($slug);

        return $this->redirect( $this->generateUrl('friends', array(
            'entities' => $entities,
            'mess' => "",
            'userAct' => $slug,
        )) );
    }

    /**
     * @Route("/delete/{id}", name="friends_delete")
     * @Template()
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $slug = $this->container->get('security.context')->getToken()->getUser();

        $user = $em->getRepository('ZniehUserBundle:User')
                    ->findOneById($id);

        $friendsLink = $em->getRepository('ZniehUserBundle:FriendsLink')
                          ->findDouble($slug, $user);

        if($friendsLink != null)
        {
            $em->remove($friendsLink);
            $em->flush();
        }

        $entities = $em->getRepository('ZniehUserBundle:FriendsLink')
                        ->findFriends($slug);

        return $this->redirect( $this->generateUrl('friends', array(
            'entities' => $entities,
            'mess' => "L'amis a bien été supprimé",
            'userAct' => $slug,
        )) );
    }
}
