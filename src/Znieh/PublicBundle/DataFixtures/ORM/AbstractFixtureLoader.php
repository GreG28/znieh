<?php

namespace Znieh\PublicBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Yaml\Yaml;

abstract class AbstractFixtureLoader extends AbstractFixture implements ContainerAwareInterface
{
    /**
     * Return the file for the current model.
     */
    abstract function getModelFile();

    /**
     * @var Symfony\Component\DependencyInjection\ContainerInterface
     */
    private $container;

    /**
     * Make the sc available to our loader.
     *
     * @param ContainerInterface $container
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * Return the fixtures for the current model.
     *
     * @return Array
     */
    public function getModelFixtures()
    {
        $reflection = new \ReflectionClass($this);
        $directory = dirname($reflection->getFileName()) . PATH_SEPARATOR;

        $fixturesPath = dirname($directory) . '/Fixtures';
        echo 'Using yml file : '. $this->getModelFile(). '.yml' . PHP_EOL;
        $fixtures     = Yaml::parse(file_get_contents($fixturesPath. '/'. $this->getModelFile(). '.yml'));

        return $fixtures;
    }
}
