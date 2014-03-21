<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Znieh\UserBundle\Form\Type\UserAdminType;
use Znieh\UserBundle\Entity\BetaRegistration;
use Znieh\UserBundle\Form\Type\BetaRegistrationType;

/**
 * BetaRegistration controller.
 *
 */
class BetaRegistrationController extends Controller
{
    private function createCreateForm(BetaRegistration $entity)
    {
        $form = $this->createForm(new BetaRegistrationType(), $entity, array(
            'action' => $this->generateUrl('znieh_user_betaregistration_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'M\'inscrire'));

        return $form;
    }

    /**
    * @Route("/")
    * @Method("GET")
    * @Template()
    */
    public function indexAction()
    {
        $entity = new BetaRegistration();
        $form = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * @Route("/")
    * @Method("POST")
    * @Template("ZniehUserBundle:BetaRegistration:index.html.twig")
    */
    public function createAction(Request $request)
    {
        $entity = new BetaRegistration();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            $this->get('session')->getFlashBag()->add('sucess', $entity->getEmail());

            $entity = new BetaRegistration();
            $form = $this->createCreateForm($entity);
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
}
