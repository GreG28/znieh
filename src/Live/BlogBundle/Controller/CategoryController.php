<?php

namespace Live\BlogBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Live\BlogBundle\Entity\Category;
use Live\BlogBundle\Form\CategoryType;
use Live\BlogBundle\Form\CategoryEditType;

/**
 * Category controller.
 *
 */
class CategoryController extends Controller
{
    /**
     * Finds and displays Post entities according to the category.
     *
     * @Route("/categories/{slug}/{page}", requirements={"page" = "\d+"}, defaults={"page" = 1}, name="category_show")
     * @Template()
     */
    public function viewAction($slug, $page)
    {
        $em = $this->getDoctrine()->getManager();

        $category = $em->getRepository('LiveBlogBundle:Category')->findOneBySlug($slug);

        if (!$category) {
            throw $this->createNotFoundException('Unable to find Category entity.');
        }

        $posts = $em->getRepository('LiveBlogBundle:Post')->findByCategory($category, 3, $page);

        return array(
            'category'  => $category,
            'posts' => $posts,
            'page'  => $page,
            'nombrePage' => ceil(count($posts)/3)
        );

    }

}
