<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Znieh\UserBundle\Entity\BetaRegistration;
use Znieh\UserBundle\Form\Type\BetaRegistrationType;

/**
 * BetaRegistration controller.
 *
 * @Route("/admin/betaregistration")
 */
class AdminBetaRegistrationController extends Controller
{

    /**
     * Lists all BetaRegistration entities.
     *
     * @Route("/", name="admin_betaregistration")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ZniehUserBundle:BetaRegistration')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new BetaRegistration entity.
     *
     * @Route("/", name="admin_betaregistration_create")
     * @Method("POST")
     * @Template("ZniehUserBundle:BetaRegistration:new.html.twig")
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

            return $this->redirect($this->generateUrl('admin_betaregistration_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * Creates a form to create a BetaRegistration entity.
    *
    * @param BetaRegistration $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createCreateForm(BetaRegistration $entity)
    {
        $form = $this->createForm(new BetaRegistrationType(), $entity, array(
            'action' => $this->generateUrl('admin_betaregistration_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new BetaRegistration entity.
     *
     * @Route("/new", name="admin_betaregistration_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new BetaRegistration();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a BetaRegistration entity.
     *
     * @Route("/{id}", name="admin_betaregistration_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUserBundle:BetaRegistration')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find BetaRegistration entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing BetaRegistration entity.
     *
     * @Route("/{id}/edit", name="admin_betaregistration_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUserBundle:BetaRegistration')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find BetaRegistration entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a BetaRegistration entity.
    *
    * @param BetaRegistration $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(BetaRegistration $entity)
    {
        $form = $this->createForm(new BetaRegistrationType(), $entity, array(
            'action' => $this->generateUrl('admin_betaregistration_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing BetaRegistration entity.
     *
     * @Route("/{id}", name="admin_betaregistration_update")
     * @Method("PUT")
     * @Template("ZniehUserBundle:BetaRegistration:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUserBundle:BetaRegistration')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find BetaRegistration entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('admin_betaregistration_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a BetaRegistration entity.
     *
     * @Route("/{id}", name="admin_betaregistration_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZniehUserBundle:BetaRegistration')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find BetaRegistration entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('admin_betaregistration'));
    }

    /**
     * Creates a form to delete a BetaRegistration entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('admin_betaregistration_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
