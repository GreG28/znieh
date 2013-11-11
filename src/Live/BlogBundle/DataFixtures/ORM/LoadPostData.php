<?php
namespace Live\BlogBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Live\BlogBundle\Entity\Post;

class LoadPostData extends AbstractFixture implements OrderedFixtureInterface
{
      /**
       * Posts to save
       */
      private $postsData = array(
                array(
                  'category'  => 'divers',
                  'author'    => 'admin',
                  'title'     => 'Présentation de Znieh Games',
                  'content'   => 'On est fou ici !!',
                  'created'   =>  '',
                ),
                array(
                  'category'  => 'divers',
                  'author'    => 'admin',
                  'title'     => 'Plus on est de fous plus rit',
                  'content'   => 'Alors on rit beaucoup...',
                  'created'   =>  '',
                ),
              );

          /**
           * {@inheritDoc}
           */
          public function load(ObjectManager $manager)
          {

              // Create posts
              foreach($this->postsData as $postData) {
                  $post = new Post();

                  $category = $manager->getRepository('LiveBlogBundle:Category')->findOneBySlug($postData['category']);
                  $author = $manager->getRepository('ZniehUserBundle:User')->findOneByUsername($postData['author']);

                  $post
                      ->addCategorie($category)
                      ->setAuthor($author)
                      ->setTitle($postData['title'])
                      ->setContent($postData['content'])
                  ;

                  if (!empty($postData['created'])) {
                    $post->setCreated(new \DateTime($postData['created']));
                  }

                  $manager->persist($post);
              }

              $manager->flush();
          }

          /**
           * {@inheritDoc}
           */
          public function getOrder()
          {
              return 12;
          }
}
