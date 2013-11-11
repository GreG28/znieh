<?php

namespace Live\BlogBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Live\BlogBundle\Entity\Post;
use Live\BlogBundle\Entity\Category;
use Live\BlogBundle\Form\PostType;
use Live\BlogBundle\Form\PostEditType;

/**
 * Post controller.
 *
 */
class PostController extends Controller
{

    /**
     * Finds and displays a Post entity.
     *
     * @Route("/posts/{slug}", name="post_show")
     * @Template()
     */
    public function viewAction($slug)
    {
        $em = $this->getDoctrine()->getManager();

        $post = $em->getRepository('LiveBlogBundle:Post')->findOneBySlug($slug);

        if (!$post) {
            throw $this->createNotFoundException('Unable to find Post entity.');
        }

        return array(
            'post'      => $post
        );
    }

}
