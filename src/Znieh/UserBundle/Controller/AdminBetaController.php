<?php

namespace Znieh\UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Znieh\UserBundle\Entity\BetaForm;
use Znieh\UserBundle\Form\BetaFormType;

/**
 * BetaForm controller.
 *
 * @Route("/admin/beta")
 */
class AdminBetaController extends Controller
{

    /**
     * Lists all BetaForm entities.
     *
     * @Route("/", name="admin_betaform")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ZniehUserBundle:BetaForm')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new BetaForm entity.
     *
     * @Route("/", name="admin_betaform_create")
     * @Method("POST")
     * @Template("ZniehUserBundle:BetaForm:new.html.twig")
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

            return $this->redirect($this->generateUrl('admin_betaform_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
    * Creates a form to create a BetaForm entity.
    *
    * @param BetaForm $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createCreateForm(BetaForm $entity)
    {
        $form = $this->createForm(new BetaFormType(), $entity, array(
            'action' => $this->generateUrl('admin_betaform_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new BetaForm entity.
     *
     * @Route("/new", name="admin_betaform_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new BetaForm();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a BetaForm entity.
     *
     * @Route("/{id}", name="admin_betaform_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUserBundle:BetaForm')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find BetaForm entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing BetaForm entity.
     *
     * @Route("/{id}/edit", name="admin_betaform_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUserBundle:BetaForm')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find BetaForm entity.');
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
    * Creates a form to edit a BetaForm entity.
    *
    * @param BetaForm $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(BetaForm $entity)
    {
        $form = $this->createForm(new BetaFormType(), $entity, array(
            'action' => $this->generateUrl('admin_betaform_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing BetaForm entity.
     *
     * @Route("/{id}", name="admin_betaform_update")
     * @Method("PUT")
     * @Template("ZniehUserBundle:BetaForm:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUserBundle:BetaForm')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find BetaForm entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('admin_betaform_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a BetaForm entity.
     *
     * @Route("/{id}", name="admin_betaform_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZniehUserBundle:BetaForm')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find BetaForm entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('admin_betaform'));
    }

    /**
     * Creates a form to delete a BetaForm entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('admin_betaform_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
