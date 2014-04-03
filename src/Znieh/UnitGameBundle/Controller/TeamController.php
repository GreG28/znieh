<?php

namespace Znieh\UnitGameBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Znieh\UnitGameBundle\Entity\Team;
use Znieh\UnitGameBundle\Form\TeamType;
use Znieh\UnitGameBundle\Form\SelectTeamType;

/**
 * Team controller.
 *
 * @Route("/village/create/team")
 * @Security("has_role('ROLE_USER')")
 */
class TeamController extends Controller
{

    /**
     * Lists all Team entities.
     *
     * @Route("/")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $teams = $em->getRepository('ZniehUnitGameBundle:Team')->findBy(array('user' => $this->getUser()));
        $units = $em->getRepository('ZniehUnitGameBundle:Unit')->findBy(array('user' => $this->getUser()));
        $form = $this->createSelectForm();

        // foreach ($teams as $key => $team) {
        //     if ($team->getSelected() == true) {
        //         $form->get('teams')->setData($team);
        //     }
        // }

        return array(
            'teams' => $teams,
            'units' => $units,
            'form'   => $form->createView(),
        );
    }
    /**
     * Creates a new Team entity.
     *
     * @Route("/", name="village_create_team_create")
     * @Method("POST")
     * @Template("ZniehUnitGameBundle:Team:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Team();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $entity->setUser($this->getUser());
            $entity->setSelected(false);
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('znieh_unitgame_team_index'));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a new Team entity.
     *
     * @Route("/select", name="village_create_team_select")
     * @Method("POST")
     * @Template("ZniehUnitGameBundle:Team:index.html.twig")
     */
    public function selectAction(Request $request)
    {
        $form = $this->createSelectForm();
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $teams = $em->getRepository('ZniehUnitGameBundle:Team')->findBy(array('user' => $this->getUser()));
            foreach ($teams as $team) {
                $team->setSelected(false);
            }
            $entity = $form['teams']->getData();
            $entity->setSelected(true);
            $em->persist($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('znieh_unitgame_team_index'));
    }

    /**
     * Creates a form to select a Team entity.
     *
     * @param Team $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createSelectForm()
    {
        $form = $this->createForm(new SelectTeamType($this->getUser()->getId()), null, array(
            'action' => $this->generateUrl('village_create_team_select'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Mettre à jour la sélection'));

        return $form;
    }

    /**
     * Creates a form to create a Team entity.
     *
     * @param Team $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Team $entity)
    {
        $form = $this->createForm(new TeamType($this->getUser()->getId()), $entity, array(
            'action' => $this->generateUrl('village_create_team_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Team entity.
     *
     * @Route("/new", name="village_create_team_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Team();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Team entity.
     *
     * @Route("/{id}", name="village_create_team_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUnitGameBundle:Team')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Team entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Team entity.
     *
     * @Route("/{id}/edit", name="village_create_team_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUnitGameBundle:Team')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Team entity.');
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
    * Creates a form to edit a Team entity.
    *
    * @param Team $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Team $entity)
    {
        $form = $this->createForm(new TeamType($this->getUser()->getId()), $entity, array(
            'action' => $this->generateUrl('village_create_team_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Team entity.
     *
     * @Route("/{id}", name="village_create_team_update")
     * @Method("PUT")
     * @Template("ZniehUnitGameBundle:Team:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZniehUnitGameBundle:Team')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Team entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('village_create_team_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Team entity.
     *
     * @Route("/{id}", name="village_create_team_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZniehUnitGameBundle:Team')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Team entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('village_create_team'));
    }

    /**
     * Creates a form to delete a Team entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('village_create_team_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
