<?php

namespace Znieh\InfractionGameBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Znieh\InfractionGameBundle\Entity\Infraction;
use Znieh\InfractionGameBundle\Form\InfractionType;

/**
 * Infraction controller.
 *
 * @Route("/admin/infractions")
 */
class InfractionController extends Controller
{

    /**
     * Lists all Infraction entities.
     *
     * @Route("/", name="admin_infractions")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ZniehInfractionGameBundle:Infraction')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Infraction entity.
     *
     * @Route("/", name="admin_infractions_create")
     * @Method("POST")
     * @Template("ZniehInfractionGameBundle:Infraction:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Infraction();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $user = $entity->getUser();
            $type = $entity->getType()->getType();
            switch ($type) {
                case 'Mineur':
                    $duree = '+1 day';
                    break;
                case 'Medium':
                    $duree = '+7 day';
                    break;
                case 'Majeur':
                    $duree = '+3 month';
                    break;
                default:
                    $duree = '';
                    break;
            }
            $user->setExpired(true);
            $user->modifyExpiresUntil($duree);

            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('admin_infractions_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Infraction entity.
     *
     * @param Infraction $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Infraction $entity)
    {
        $form = $this->createForm(new InfractionType(), $entity, array(
            'action' => $this->generateUrl('admin_infractions_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Infraction entity.
     *
     * @Route("/new", name="admin_infractions_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Infraction();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Infraction entity.
     *
     * @Route("/{id}", name="admin_infractions_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehInfractionGameBundle:Infraction')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Infraction entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Infraction entity.
     *
     * @Route("/{id}/edit", name="admin_infractions_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehInfractionGameBundle:Infraction')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Infraction entity.');
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
    * Creates a form to edit a Infraction entity.
    *
    * @param Infraction $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Infraction $entity)
    {
        $form = $this->createForm(new InfractionType(), $entity, array(
            'action' => $this->generateUrl('admin_infractions_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Infraction entity.
     *
     * @Route("/{id}", name="admin_infractions_update")
     * @Method("PUT")
     * @Template("ZniehInfractionGameBundle:Infraction:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehInfractionGameBundle:Infraction')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Infraction entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('admin_infractions_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Infraction entity.
     *
     * @Route("/{id}", name="admin_infractions_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZniehInfractionGameBundle:Infraction')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Infraction entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('admin_infractions'));
    }

    /**
     * Creates a form to delete a Infraction entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('admin_infractions_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
