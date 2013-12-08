<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Znieh\UserBundle\Form\Type\UserAdminType;
use Znieh\UserBundle\Entity\BetaForm;
use Znieh\UserBundle\Form\BetaFormType;

class BetaController extends Controller
{
    private function createCreateForm(BetaForm $entity)
    {
        $form = $this->createForm(new BetaFormType(), $entity, array(
            'action' => $this->generateUrl('znieh_user_beta_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
    * @Route("/beta/registration")
    * @Method("GET")
    * @Template()
    */
    public function betaRegistrationAction()
    {
        $entity = new BetaForm();
        $form = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

     /**
    * @Route("/beta/create")
    * @Method("POST")
    * @Template("ZniehUserBundle:Beta:betaRegistration.html.twig")
    */
    public function createAction(Request $request)
    {
        $entity = new BetaForm();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('znieh_user_user_index'));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }
}
