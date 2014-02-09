<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * ArmorPartType
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class ArmorPartType
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Expose
     */
    private $name;

    /**
     * @var array
     *
     * @ORM\Column(name="effects", type="array", nullable=true)
     * @Expose
     */
    protected $effects;

    public function __construct()
    {
        $this->effects = array();
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return ArmorPartType
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    public function addEffect($key, $effect)
    {
        if (!in_array($effect, $this->effects, true)) {
            $this->effects[$key] = $effect;
        }

        return $this;
    }

    public function removeEffect($effect)
    {
        if (false !== $key = array_search($effect, $this->effects, true)) {
            unset($this->effects[$key]);
            $this->effects = array_values($this->effects);
        }

        return $this;
    }

    public function getEffects()
    {
        return $this->effects;
    }

    public function setEffects(array $effects)
    {
        $this->effects = array();

        foreach ($effects as $key => $effect) {
            $this->addEffect($key, $effect);
        }

        return $this;
    }
}
